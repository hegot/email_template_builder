import { Mention } from './Mention';
import { Suggestion } from './Suggestion';

export function getDecorators(config){  
  return [
    (new Mention(config.mentionClassName)).getMentionDecorator(),
    (new Suggestion(config)).getSuggestionDecorator(),
  ];
}
