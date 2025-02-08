import { ApiSeminar } from '@/api/types';
import { seminarService } from '@api/services';
import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import { Col, Flex, message, Row, Spin } from 'antd';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import SeminarContextProvider from './SeminarContext';
import { AxiosError } from 'axios';

const SeminarList = () => {
  const [seminars, setSeminars] = useState<ApiSeminar[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [activeSeminar, setActiveSeminar] = useState<ApiSeminar | null>(null);
  const [error, setError] = useState<Error | AxiosError>();

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await seminarService.delete(activeSeminar!.id);

      setSeminars((s) => s.filter((el) => el.id !== response.data.id));

      messageApi.success('Семинар успешно удалён');
    } catch (error) {
      console.error(error);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
      setOpenDelete(false);
      setActiveSeminar(null);
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

      messageApi.success('Семинар успешно изменён');
    } catch (error) {
      console.error(error);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
      setOpenEdit(false);
      setActiveSeminar(null);
    }
  };

  const handleCancel = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setActiveSeminar(null);
  };
  useEffect(() => {
    if (error) {
      messageApi.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        setLoading(true);
        const response = await seminarService.get();

        setSeminars(response.data);
      } catch (error) {
        console.error(error);
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };
    loadSeminars();
  }, []);

  return (
    <>
      {contextHolder}
      {loading && seminars.length === 0 && <Spin size='large' fullscreen />}
      <Row
        gutter={[16, 16]}
        justify={{ xs: 'center', sm: 'start' }}
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingBottom: '16px',
        }}
      >
        {seminars.map((el) => (
          <Col key={el.id} lg={8} sm={12} xs={100}>
            <Flex justify='center'>
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
            </Flex>
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
