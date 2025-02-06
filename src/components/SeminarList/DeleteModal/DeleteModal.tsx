import { Modal } from 'antd';
import React, { FC } from 'react';

export type DeleteModalProps = {
  open: boolean;
  loading?: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ open, loading = false, onOk, onCancel }) => {
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={'Ок'}
      confirmLoading={loading}
      cancelText={'Отменить'}
    >
      Удалить семинар?
    </Modal>
  );
};

export default DeleteModal;
