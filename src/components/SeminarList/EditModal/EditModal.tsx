import { DatePicker, Form, Input, Modal } from 'antd';
import ru from 'antd/es/date-picker/locale/ru_RU';
import React, { FC, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ru';
import { useSeminar } from '../SeminarContext';
import { ApiSeminar } from '@/api/types';

dayjs.extend(customParseFormat);
dayjs.locale('ru');

export type EditModalProps = {
  open: boolean;
  loading?: boolean;
  onOk: (seminar: ApiSeminar) => void;
  onCancel: () => void;
};

type Values = {
  title: string;
  description: string;
  datetime: string;
};

const dateTimeFormat = 'HH:mm DD.MM.YYYY';

const EditModal: FC<EditModalProps> = ({ open, loading = false, onOk, onCancel }) => {
  const [form] = Form.useForm<Values>();
  const seminar = useSeminar();
  const initialValues = (seminar: ApiSeminar | null) => {
    const newVal = {
      title: seminar?.title,
      description: seminar?.description,
      datetime: seminar ? `${seminar.time} ${seminar.date}` : undefined,
    };
    return newVal;
  };

  const handleSubmit = (values: Values) => {
    // console.log('values', values);
    const newSeminar = { ...seminar };
    newSeminar.title = values.title;
    newSeminar.description = values.description;

    const [time, date] = values.datetime.split(' ');
    newSeminar.time = time;
    newSeminar.date = date;

    onOk(newSeminar as ApiSeminar);
  };

  useEffect(() => {
    form.setFieldsValue(initialValues(seminar));
  }, [seminar]);

  return (
    <Modal
      open={open}
      forceRender
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
      okText={'Ок'}
      confirmLoading={loading}
      cancelText={'Отменить'}
      title='Редактировать семинар'
      okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
    >
      <Form form={form} onFinish={handleSubmit} layout='vertical'>
        <Form.Item
          label='Дата и время'
          name='datetime'
          rules={[{ required: true, message: 'Укажите дату' }]}
          required
          getValueProps={(value) => ({ value: value && dayjs(value, dateTimeFormat) })}
          normalize={(value) => value && dayjs(value).format(dateTimeFormat)}
        >
          <DatePicker showTime format={dateTimeFormat} locale={ru} minDate={dayjs()} />
        </Form.Item>
        <Form.Item
          label='Заголовок'
          name='title'
          required
          rules={[{ required: true, message: 'Укажите заголовок' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
          required
          rules={[{ required: true, message: 'Добавьте описание' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
