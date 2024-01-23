import { createSelector } from '@reduxjs/toolkit';
import { postsSlice, postsAdapter } from '../slices/postsSlice'; // Tambahkan postsAdapter

const selectPostsResult = postsSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? postsSlice.initialState);
