import { createSelector } from '@reduxjs/toolkit';
import { usersSlice, usersAdapter } from '../slices/usersSlice'; // Tambahkan usersAdapter

const selectUsersResult = usersSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? usersSlice.initialState);
