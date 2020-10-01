export function Service(): ClassDecorator {
  return function (target) {
    const service = {
      type: target,
    };
    console.log(target);
  };
}
