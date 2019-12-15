import React from 'react';
import classnames from 'classnames';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.css';

interface Props {
  readOnly?: boolean,
  defaultValue?: string,
}

interface State {
  editorState: any,
}

export default class Editor extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
    }
  }

  uploadFn = (param: any) => {
    const serverURL = `uploadPath`;
    const xhr = new window.XMLHttpRequest();
    const fd = new window.FormData();

    const successFn = (response: object) => {
      const { data } = JSON.parse(xhr.responseText);
      param.success({
        url: `callback_img_url`,
        meta: {
          id: data.files[0].id,
          title: data.files[0].filename,
          alt: '',
        },
      });
    };

    const progressFn = (event: any) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response: any) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: '上传失败',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader('Authorization', `Bearer ${window.sessionStorage.getItem('AUTHTOKEN')}`);
    xhr.send(fd);
  };

  contentChange = (editorState: object) => {
    this.setState({ editorState });
  }

  // 设置html形式内容
  setHtmlContent = (htmlContent: string) => {
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  //获取html内容
  getHtml = () => {
    const isEmpty = this.state.editorState.isEmpty();
    const text = this.state.editorState.toText();
    if (isEmpty || !text.replace(/\s+/g, "")) {
      return null;
    }
    return this.state.editorState.toHTML();
  }

  //媒体配置
  mediaConf:any = {
    uploadFn: this.uploadFn,
    accepts: {
      image: 'image/png,image/jpeg,image/gif,image/svg',
      video: false,
      audio: false,
    },
    externals: false,
  }

  render() {
    const { readOnly, defaultValue } = this.props;
    return (
      <BraftEditor
        value={!readOnly && this.state.editorState}
        defaultValue={readOnly && BraftEditor.createEditorState(defaultValue)}
        onChange={this.contentChange}
        readOnly={readOnly}
        className={classnames(styles.editor, {[styles.readStyle]: readOnly}, {[styles.height100]: readOnly})}
        // media={this.mediaConf}
      />
    )
  }
}
