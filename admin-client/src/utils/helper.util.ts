export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export function formatDateISOStringToDDMMYYYY(isoString: string) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng trong JavaScript đếm từ 0
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
