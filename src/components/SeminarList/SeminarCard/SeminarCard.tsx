import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Image } from 'antd';
import React, { FC } from 'react';
import placeholder from '@/assets/placeholder.png';

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
      style={{ overflow: 'hidden', maxWidth: 400 }}
      cover={<Image src={photo} alt={title} preview={false} fallback={placeholder} />}
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
      <Typography.Paragraph type='secondary' style={{ marginBottom: 0 }}>
        <CalendarOutlined style={{ marginRight: 6 }} />
        {`${time} ${date}`}
      </Typography.Paragraph>
      <Card.Meta
        title={
          <Typography.Title level={5} title={title} ellipsis>
            {title}
          </Typography.Title>
        }
        description={
          <Typography.Paragraph
            style={{ minHeight: '3rem', marginBottom: 'auto' }}
            type='secondary'
            ellipsis={{
              rows: 2,
              expandable: 'collapsible',
              symbol: (expanded) => (expanded ? 'Свернуть' : 'Развернуть'),
            }}
          >
            {description}
          </Typography.Paragraph>
        }
      ></Card.Meta>
    </Card>
  );
};

export default SeminarCard;
