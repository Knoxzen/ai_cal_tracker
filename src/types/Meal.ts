export interface Meal {
  id: string
  userId: string
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  sugar: number
  sodium: number
  micros: { [key: string]: number }
}
