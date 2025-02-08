import { ApiSeminar } from '@/api/types';
import { seminarService } from '@api/services';
import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import { Col, Row } from 'antd';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import SeminarContextProvider from './SeminarContext';

const SeminarList = () => {
  const [seminars, setSeminars] = useState<ApiSeminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSeminar, setActiveSeminar] = useState<ApiSeminar | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await seminarService.delete(activeSeminar!.id);

      setSeminars((s) => s.filter((el) => el.id !== response.data.id));

      setLoading(false);
      setOpenDelete(false);
      setActiveSeminar(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (newSeminar: ApiSeminar) => {
    try {
      setLoading(true);
      const response = await seminarService.patch(activeSeminar!.id, newSeminar);

      setSeminars((s) => {
        const newElIndex = s.findIndex((el) => el.id === activeSeminar!.id);
        s[newElIndex] = response.data;
        return s;
      });

      setLoading(false);
      setOpenEdit(false);
      setActiveSeminar(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setActiveSeminar(null);
  };

  useEffect(() => {
    seminarService
      .get()
      .then((res) => {
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
              onEdit={() => {
                setOpenEdit(true);
                setActiveSeminar(el);
              }}
            ></SeminarCard>
          </Col>
        ))}
      </Row>
      <SeminarContextProvider value={activeSeminar}>
        <DeleteModal
          open={openDelete}
          onOk={handleDelete}
          onCancel={handleCancel}
          loading={loading}
        ></DeleteModal>
        <EditModal
          open={openEdit}
          onOk={handleEdit}
          onCancel={handleCancel}
          loading={loading}
        ></EditModal>
      </SeminarContextProvider>
    </>
  );
};

export default SeminarList;
