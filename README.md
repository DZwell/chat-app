1. `npm i`
2. You'll need two terminal panes open, run these commands:
  - `npm run-api-server`
  - `npm start`
3. Open a browser and go to `localhost:1234`


Notes
  - Question -- why are all of these 100%?  You should be able to make whatever container you need at 100%, 100%.
  - #root?  ids probably shouldn't be styled.  Styled ids are most likely a systematic issue that will have cohesion or specificity issues later.  This can lead to a ton of tech ebt.

    - https://github.com/DZwell/chat-app/blob/master/public/components/MessagesView/MessagesView.tsx#L46
      - fetch functions are better established externally.  The issue here is that this component will have to change even if the controller needs to be updated.  Breaks the single responsibility principle.

  - https://github.com/DZwell/chat-app/blob/master/public/components/ChatWindowContainer/ChatWindowContainer.tsx#L20
    - believe this is just a browser timeout

- https://github.com/DZwell/chat-app/blob/master/public/components/App/interfaces.ts
  - shoul dbe higher level imo

