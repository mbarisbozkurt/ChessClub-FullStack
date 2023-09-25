import {TEACHERS_URL} from "../constants";
import {apiSlice} from "./apiSlice"

//for backend: to be able to make a query for http://localhost:5000/api/teachers (from the backend) and get the data
export const teachersApiSlice = apiSlice.injectEndpoints({ //add endpoints to http://localhost:5000
  endpoints: (builder) => ({
    getTeachers: builder.query({ //for useGetTeacherQuery in the export part
      query: () => ({
        url: TEACHERS_URL, //get data from here: http://localhost:5000/api/teachers
      }),
      providesTags: ["Teachers"], //refresh the page
      keepUnusedDataFor: 5,
    }), 
    getTeacherDetails: builder.query({ //for useGetTeacherQuery in the export part
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`, //get data from here: http://localhost:5000/api/teachers/:id
      }),
      keepUnusedDataFor: 5,
    }), 
  }),
});

//Convention: use....Query e.g: use teachers Query
export const {useGetTeachersQuery, useGetTeacherDetailsQuery} = teachersApiSlice; 