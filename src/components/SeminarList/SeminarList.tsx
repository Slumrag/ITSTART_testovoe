import { ApiSeminar } from '@/api/types';
import { seminarService } from '@api/services';
import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import { Col, Modal, Row } from 'antd';

const SeminarList = () => {
  const [seminars, setSeminars] = useState<ApiSeminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSeminar, setActiveSeminar] = useState<ApiSeminar | null>(null);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await seminarService.delete(activeSeminar!.id);

      console.log(response.data);

      setSeminars((s) => s.filter((el) => el.id !== response.data.id));

      setLoading(false);
      setOpenDelete(false);
      setActiveSeminar(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOpenDelete(false);
    setActiveSeminar(null);
  };

  useEffect(() => {
    seminarService
      .get()
      .then((res) => {
        console.log(res.data);
        setSeminars(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        {seminars.map((el) => (
          <Col key={el.id} lg={8} md={12} xs={100}>
            <SeminarCard
              {...el}
              onDelete={() => {
                setOpenDelete(true);
                setActiveSeminar(el);
              }}
              onEdit={() => console.log('edit', el)}
            ></SeminarCard>
          </Col>
        ))}
      </Row>
      <Modal
        open={openDelete}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText={'Ок'}
        confirmLoading={loading}
        cancelText={'Отменить'}
      >
        Удалить семинар?
      </Modal>
    </>
  );
};

export default SeminarList;
