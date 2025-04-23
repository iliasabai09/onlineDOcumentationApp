export function validateForm(obj: { [key: string]: any }, exclude: string[] = []) {
    if (typeof (obj) !== 'object') return false;
    return Object.entries(obj).every(([key, value]) => value || exclude.includes(key))
}