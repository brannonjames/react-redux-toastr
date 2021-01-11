import {mapToToastrMessage} from './utils.js';
import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

const addToToastr = (type, array) => {
  console.log('Emitting add/toastr', type, array);
  emitter.emit('add/toastr', mapToToastrMessage(type, array));
};

let actions = {};
['light', 'message', 'info', 'success', 'warning', 'error'].forEach(item => {
  actions[item] = (...args) => addToToastr(item, args);
});

console.log('initialized actions', actions);

actions.clean = () => emitter.emit('clean/toastr');

/**
 * @params: can be a ID or a object that with a property type: 'success'
 * and by passing this we will remove all toastr with that type.
 */
actions.removeByType = (type) => emitter.emit('removeByType/toastr', type);

actions.remove = (id) => emitter.emit('remove/toastr', id);

actions.confirm = (...args) => {
  emitter.emit('toastr/confirm', {
    message: args[0],
    options: args[1] || {}
  });
};

emitter.eventNames().forEach(event => {
  emitter.on(event, (options) => {
    console.log('---------------------');
    console.log('Emitted ' + event);
    console.log('options: ', options);
    console.log('---------------------');
  });
});

export const EE = emitter;
export const toastrEmitter = actions;

