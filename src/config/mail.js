/**
 * @description: Configuration for App Email tests with mailtrap.io.
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'cfffd6667b5174',
    pass: '74a543776e08a9'
  },
  default: {
    from: 'FastFeet Notification <noreply@fastfeet.com>'
  }
};
