export function Service(): ClassDecorator {
  return function (target) {
    console.log(target);
  };
}
