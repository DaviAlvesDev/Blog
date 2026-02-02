function validateEmail(email: string): boolean {
    const hasAt = email.includes('@')
    const hasDot = email.includes('.')
    const hasSpaces = email.includes(' ')

    const startsWithAt = email.indexOf('@') === 0
    const startsWithDot = email.indexOf('.') === 0

    if (hasAt && hasDot && !hasSpaces && !startsWithAt && !startsWithDot) return true
    return false
}

export default validateEmail