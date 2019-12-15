import React from 'react';
import { Button, message } from 'antd';
import Editor from '@/components/Editor';
import Preview from './preview';
import styles from './index.css';

interface State {
  showPreviewModal: boolean,
  htmlContent: string,
}

export default class Home extends React.PureComponent<{}, State> {
  editorRef: any;

  constructor(props: any){
    super(props);
    this.editorRef = null;
    this.state = {
      showPreviewModal: false,
      htmlContent: '',
    }
  }

  preview = () => {
    const editor = this.editorRef.getHtml();
    if (editor) {
      this.setState({
        showPreviewModal: true,
        htmlContent: editor,
      })
    } else {
      message.error('还没有输入有效内容～_～！！')
    }
  }

  render () {
    const {showPreviewModal, htmlContent }  = this.state;
    const previewProps:any = {
      visible: showPreviewModal,
      htmlContent: htmlContent,
      onClose: () => {
        this.setState({
          showPreviewModal: false,
        })
      }
    }

    return (
      <div className={styles.normal}>
        <div className={styles.btn}>
          <Button onClick={this.preview} type="primary" >预览</Button>
        </div>
        <Editor ref={intance => this.editorRef = intance} />
        <Preview {...previewProps} />
      </div>
    );
  }
}
