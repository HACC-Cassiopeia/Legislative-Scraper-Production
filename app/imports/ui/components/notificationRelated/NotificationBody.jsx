import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const NotificationBody = ({ hearing }) => (
  <tr>
    <td>{hearing.measure}</td>
    <td>{hearing.dateTime}</td>
    <td>{hearing.room}</td>
    <td>
      <a
        href={hearing.youtubeURL}
        style={{ textAlign: 'center', color: 'black' }}
      >
        <Icon.Youtube />
      </a>
    </td>
    <td>
      <a
        href={hearing.noticeURL}
        style={{ textAlign: 'center', color: 'black' }}
      >
        <Icon.Paperclip />
      </a>
    </td>
    <td>
      <a
        href={hearing.noticePdfURL}
        style={{ textAlign: 'center', color: 'black' }}
      >
        <Icon.EnvelopePaper />
      </a>
    </td>
  </tr>
);

// Require a document to be passed to this component.
NotificationBody.propTypes = {
  hearing: PropTypes.object,
};

export default NotificationBody;
