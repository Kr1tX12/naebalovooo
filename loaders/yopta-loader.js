// не трогать пж, а то всё сломается

require('yopta');

module.exports = function (source) {
  const tsxCode = yopta(source, 'ys');
  return tsxCode;
};
