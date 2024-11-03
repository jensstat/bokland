// src/stores/editMode.js

import {writable} from 'svelte/store';

// 'isEditing' indicates if we're in editing mode ('true') or normal mode ('false')
export const isEditing = writable(false);
