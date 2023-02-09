exports.handler = (event, context) => {
  const threadId = event.source && event.source.id;
  context.done(null, 5);
};
