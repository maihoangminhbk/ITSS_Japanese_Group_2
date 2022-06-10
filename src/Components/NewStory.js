import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import {Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import BlockStyleControls from './RichText/BlockStyleControls';
import InlineStyleControls from './RichText/InlineStyleControls';

import '../RichText.css';

export default class NewStory extends Component {
  constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
        title: '',
        body: '',
        done: 'no'
      };

      this.focus = () => this.refs.editor.focus();
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(editorState) {
      this.setState({editorState});
      const contentState = this.state.editorState.getCurrentContent();
      const html = stateToHTML(contentState);
      this.state.title && this.state.body ? this.setState({done: 'done'}) : console.log('Made by Group 2');
      this.setState({body: html});
    }


    handleSubmit() {
      const { title, body } = this.state;
      if(title && body) {
        let newStory = {id: uuidv1(), title, body, bookmark: false};
        this.props.handleSubmission(newStory);
        this.setState({editorState: EditorState.createEmpty(), title: '', body: '', done: 'submitted'});
      }
    }

    render() {
      const { editorState } = this.state;
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      const { title, done } = this.state;

      return (
        <div className="richtext-editor">
          <input type="text" className="input-title" value={title} onChange={(e) => this.setState({title: e.target.value})} placeholder="タイトル" />
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              placeholder="ストーリーを話してください。。。"
              ref="editor"
              spellCheck={true}
            />
          </div>
          {done ==='done' ? <button onClick={this.handleSubmit} className="btn btn-submit">サミット</button> : (done==='submitted' ? <span className="msg-success">サミットした</span> : <span className="msg-error">ストーリーを終わらなければならない</span>)}
        </div>
      );

    }
}
