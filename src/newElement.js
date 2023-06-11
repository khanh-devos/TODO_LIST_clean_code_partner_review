const createNewElement = ({
  type,
  id,
  className,
  content,
  events = {},
}) => {
  const el = document.createElement(type);
  el.id = id || '';
  el.className = className || '';
  el.innerHTML = content || '';
  Object.entries(events).forEach(([fn, handle]) => {
    el.addEventListener(fn, handle);
  });

  return el;
};

export default createNewElement;