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
      // style={{ maxWidth: 300 }}
      cover={<img src={photo} alt={title} />}
      actions={[
        <Button type='text' icon={<EditOutlined />} onClick={() => onEdit()}></Button>,
        <Button type='text' icon={<DeleteOutlined />} onClick={() => onDelete()}></Button>,
      ]}
    >
      <Typography.Paragraph type='secondary' style={{ marginBottom: 8 }}>
        <CalendarOutlined style={{ marginRight: 6 }} />
        {`${time} ${date}`}
      </Typography.Paragraph>
      <Card.Meta title={title} description={description}></Card.Meta>
    </Card>
  );
};

export default SeminarCard;
