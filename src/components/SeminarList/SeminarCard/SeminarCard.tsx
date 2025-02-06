import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import React, { FC } from 'react';

type SeminarCardProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  onDelete: () => void;
  onEdit: () => void;
};

const SeminarCard: FC<SeminarCardProps> = ({
  title,
  description,
  date,
  time,
  photo,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      cover={<img src={photo} alt={title} />}
      actions={[
        <Button
          type='text'
          size='large'
          icon={<EditOutlined />}
          style={{ width: '90%' }}
          onClick={() => onEdit()}
        ></Button>,
        <Button
          type='text'
          size='large'
          icon={<DeleteOutlined />}
          style={{ width: '90%' }}
          onClick={() => onDelete()}
        ></Button>,
      ]}
    >
      <Typography.Paragraph type='secondary' style={{ marginBottom: 8 }}>
        <CalendarOutlined style={{ marginRight: 6 }} />
        {`${time} ${date}`}
      </Typography.Paragraph>
      <Card.Meta
        title={title}
        description={description}
        style={{ marginBottom: 'auto' }}
      ></Card.Meta>
    </Card>
  );
};

export default SeminarCard;
