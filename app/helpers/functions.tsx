import { Task } from "../context/tasks/TaskProviderValue"

export const getTimedGreetings = () => {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        return 'Good morning'
    } else if (curHr < 18) {
        return 'Good afternoon'
    } else {
        return 'Good evening'
    }
}

export function getWeekdayName() {
    const date = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
  }

export function formatDate(customDate?: Date) {
  const date = customDate || new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength);
  }
  return str;
}

export function calculateCompletionPercentage(tasks: Task[] | undefined): number {
  if(tasks === undefined) return 0;
    
  if (tasks.length === 0) return 0;

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return Math.round(completionPercentage);
}

export function calculateCompletionStreak(tasks: Task[] | undefined): number {
  if(tasks === undefined) return 0;
  
  let maxStreak = 0;
  let currentStreak = 0;

  tasks.forEach(task => {
    if (task.completed) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
}