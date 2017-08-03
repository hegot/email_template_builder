import React from 'react';
const Link = (props) => { 
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
      <a href={url} style={{color: '#575f67', background: '#e6f3ff', padding: '0 2px'}}>
        {props.children}
      </a>
  );
};

export class Mention {
  findMentionEntities:any;
  className:any;
  constructor(className) {
    this.className = className;
  }
  public getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: Link,
  });
}

Mention.prototype.findMentionEntities = (contentBlock, callback, contentState) => { 
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'MENTION'
      );
    },
    callback
  );
};

