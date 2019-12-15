import React from 'react';
import Editor from '@/components/Editor';
import { Modal } from 'antd';

interface Props {
  visible?: boolean,
  htmlContent: string,
  onClose: (e: React.MouseEvent<HTMLElement>) => void,
}

export default class Preview extends React.PureComponent<Props> {
  editorRef: any;

  constructor(props: Props) {
    super(props);
    this.editorRef = null;
  }

  render() {
    const { visible, onClose, htmlContent } = this.props;
    return (
      <Modal
        title="预览"
        visible={visible}
        width="80vw"
        footer={null}
        onCancel={onClose}
        destroyOnClose={true}
      >
        <Editor readOnly={true} defaultValue={htmlContent} />
      </Modal>
    );
  }
}
