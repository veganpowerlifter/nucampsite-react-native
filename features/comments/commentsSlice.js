import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {
        addComment: (state, action) => { //new case reducer
            state.commentsArray.push(action.payload)
        }
    },
    extraReducers: (builder) => { // async reducers - waiting for network connection and jmake the request to json server

        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.commentsArray = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            })
    }
});

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, {dispatch, getState}) => {
        setTimeout(()=> {
            const { comments } = getState();
            payload.date = new Date().toISOString();
            payload.id = comments.commentsArray.length;
            dispatch(addComment(payload))
        }, 2000)
          }
);

// Expose the addComment action by adding a new export at the end of the file accessing the addComment property of the commentsSlice.actions object using destructuring.
// An example of this can be found in the favoritesSlice.js file for the toggleFavorite action

export const { addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;