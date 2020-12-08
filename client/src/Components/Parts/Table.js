import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const Table = ({list}) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];


    const TableItem = (item, index) => {
        const date = new Date(item.played_at);

        var hours = date.getHours();
        var m = 'am';
        if(hours > 12) {
          hours -= 12;
          m = 'p';
        }
        return (<tr key={item.played_at}>
            <td>{index + 1}</td>
            <td>{item.track_name}</td>
            <td>{`${date.getDate()} ${months[date.getMonth()]}, ${hours}:${date.getMinutes()}${m}`}</td>
        </tr>)
    };


    
  return (
        <div>
          <h2>Recent Tracks</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Song Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
                {list.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
        </div>
      );
};

export default Table;
