export const Reg = new Map([
  [
    'IP',
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  ],
  ['Phone', /^[1][3-9][0-9]{9}$/],
  ['Email', /^([a-zA-Z0-9._-]+)@[a-zA-Z0-9_-]+\.[a-z]+$/]
]);
/** 是否合法IP地址 */
export function isIP(value: string): boolean {
  const reg = Reg.get('IP');
  if (!value || !reg) {
    return false;
  }
  return !reg.test(value);
}

/** 是否手机号码 */
export function isPhone(value: string): boolean {
  const reg = Reg.get('Phone');
  if (!value || !reg) {
    return false;
  }
  return !reg.test(value);
}

/** 是否邮箱 */
export function isEMail(value: string): boolean {
  const reg = Reg.get('Email');
  if (!value || !reg) {
    return false;
  }
  return !reg.test(value);
}

export default {};
