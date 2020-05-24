# State management using hooks

## Idea

Redux is a great state management system but can often create a serious overhead.
In quite some cases, state management is used when it's in essence not required. We like to keep a distinction between presentational & functional components, so whenever the use case includes fetching any data, the store is being used for that. 

In order to fullfil the need of loading state, error handling & data manipulation, many actions, reducers (and sagas) are being created. This works fine is and scalable for large applications but takes too much monkey work time.

Many people ran against this 'problem'. Recently two new, promising looking libraries were introduced to help us dealing with those 'problems'. One of those is called [React Query](https://github.com/tannerlinsley/react-query), the other one goes by the name of [Recoil](https://github.com/facebookexperimental/Recoil)

### React Query

TBD

### Recoil

TBD