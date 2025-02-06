import { ApiSeminar } from '@/api/types';
import { seminarService } from '@api/services';
import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import { Col, Row } from 'antd';

const SeminarList = () => {
  const [seminars, setSeminars] = useState<ApiSeminar[]>([]);

  useEffect(() => {
    seminarService
      .get()
      .then((res) => {
        console.log(res.data);
        setSeminars(res.data);
      })
      .catch((err) => console.log(err));

    seminarService.getById(0).then((res) => console.log(res.data));
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {seminars.map((el) => (
        <Col key={el.id} lg={8} md={12} sm={100}>
          <SeminarCard
            {...el}
            onDelete={() => console.log('delete', el)}
            onEdit={() => console.log('edit', el)}
          ></SeminarCard>
        </Col>
      ))}
    </Row>
  );
};

export default SeminarList;
