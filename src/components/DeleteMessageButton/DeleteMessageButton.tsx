import React from 'react';

interface DeleteMessageButtonProps {
  handleDeleteMessage: (messageId: string) => void;
  messageId: string;
}

export class DeleteMessageButton extends React.Component<DeleteMessageButtonProps> {
  render() {
    const { handleDeleteMessage, messageId } = this.props;
    return (
      <div
        onClick={() => handleDeleteMessage(messageId)}
        className='deleteButton'
      >
        X
      </div>
    );
  }
}
