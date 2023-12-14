
import { createSlice } from '@reduxjs/toolkit';

type State = {
  open: boolean;
  modalType: string | null;
  data: any;
}

const initialState: State = {
  open: false,
  modalType: '',
  data: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.modalType = action.payload.modalType;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.open = false;
      state.modalType = '';
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

