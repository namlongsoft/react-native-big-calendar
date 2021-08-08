import dayjs from 'dayjs'
import * as React from 'react'
import { Platform, Text, TouchableOpacity, View, ViewStyle, ScrollView } from 'react-native'

import { eventCellCss, u } from '../commonStyles'
import { ICalendarEvent } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { isToday, typedMemo } from '../utils'
import { usePanResponder } from '../hooks/usePanResponder'

export interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[]
  style: ViewStyle
  allDayEvents: ICalendarEvent<T>[]
  onPressDateHeader?: (date: Date) => void
  dots: any,
  mode: string
  onSwipeHorizontal: any,
  targetDate: any
}

function _CalendarHeader<T>({
  dateRange,
  style,
  onPressDateHeader,
  dots,
  mode,
  targetDate,
  onSwipeHorizontal
}: CalendarHeaderProps<T>) {
  const scrollView = React.useRef<ScrollView>(null)

  const isDay = mode == 'day';
  const isWeek = mode == 'week';

  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date)
    },
    [onPressDateHeader],
  )

  const Dots = () => (<View style={{
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.palette.gray['500'],
    marginHorizontal: 1,
  
  }} />)

  const renderDots = React.useCallback((date) => {
    const dotLength = dots && dots[date.format('YYYY-MM-DD')]
    if (!dotLength) return null
    const arrDot = Array(dotLength).fill(0);
    return <View style={[u['flex-row'], u['self-center'],u['py-2'],u['mb-2']]}>
      {arrDot.slice(0).map(() => <Dots />)}
    </View>
  }, [dots])

  const theme = useTheme()
 
  const borderColor = { borderColor: theme.palette.gray['200'] }

  
  const panResponder = usePanResponder({
    swipeThreshold: 10,
    onSwipeHorizontal,
  })

  
  return (
    <View
      style={[
        u['border-b-2'],
        borderColor,
        theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
        style,
      ]}
    >
      <ScrollView
        ref={scrollView}
        horizontal
        {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View
          style={[u['z-10'], u['w-50'], borderColor]}
          {...(Platform.OS === 'web' ? panResponder.panHandlers : {})} />

          {dateRange.map((date) => {
        const _isToday = isToday(date)
        const isSelected = targetDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        const isCurrentedHighlight = ((isDay && isSelected) || (isWeek && _isToday)) 
        return (
          <TouchableOpacity
            style={[u['flex-1'], u['pt-2'], isCurrentedHighlight  &&  {backgroundColor: 'rgba(255,187,0, 0.1)'}]}
            onPress={() => _onPress(date.toDate())}
            disabled={onPressDateHeader === undefined}
            key={date.toString()}
          >
            <View style={[u['justify-between']]}>
              <Text
                style={[
                  theme.typography.sm,
                  u['text-center'],
                  { color: _isToday ? theme.palette.primary.main : theme.palette.gray['500'] },
                  u['mt-4'],
                ]}
              >
                {date.format('ddd')}
              </Text>
              <View
                style={
                  _isToday
                    ? [
                        // u['h-36'],
                        // u['pb-6'],
                        u['items-center'],
                        u['justify-center'],
                        u['self-center'],
                        u['z-20'],
                      ]
                    : []
                }
              >
                <Text
                  style={[
                    {
                      color: isCurrentedHighlight
                        ? theme.palette.primary.contrastText
                        : theme.palette.gray['800'],
                    },
                    theme.typography.xl,
                    u['text-center'],
                    Platform.OS === 'web' && _isToday && u['mt-6'],
                  ]}
                >
                  {date.format('D')}
                </Text>
              </View>
              {renderDots(date)}
            </View>
          </TouchableOpacity>
        )
      })}
        </ScrollView>
    </View>
  )
}

export const CalendarHeader = typedMemo(_CalendarHeader)
