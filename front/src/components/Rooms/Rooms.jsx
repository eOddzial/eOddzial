import React, {useState, useEffect, useMemo, useRef} from "react";
import RoomsService from "../../services/RoomsService";
import {useTable} from "react-table";

const Rooms = (props) => {
    const [rooms, setRooms] = useState([]);
    const roomsRef = useRef();

    roomsRef.current = rooms;

    useEffect(() => {
        retriveRooms();
    }, []);

    const retriveRooms = () => {
        RoomsService.getAll()
            .then((response) => {
                setRooms(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deletionAlert = (id) => {
        if (prompt("Wprowadz DELETE zeby potwierdzic usuniecie\nUWAGA!!! Usuniecie tego elementu bedzie skutkowalo usunieciem powiazanych danych!",) === "DELETE") {
            deleteRoom(id)
        }
    }

    const deleteRoom = (id) => {
        RoomsService.remove(id)
            .then(response => {
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Operation room",
                accessor: "room_number",
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: rooms,
    });

    return (
        <div className="col-md-12 list table_style">
            <table
                className="table table-striped table-bordered"
                {...getTableProps()}
            >
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                Sale Operacyjne
                                <a href='/add_room'>
                                    <button type="submit" className="btn btn-success table_button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg> Dodaj
                                    </button>
                                </a>

                                <a href='/rooms_breaks'>
                                    <button type="submit" className="btn btn-warning table_button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-pause-circle" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                                        </svg> Przerwy
                                    </button>
                                </a>

                            </th>
                        ))}


                    </tr>
                ))}


                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, _i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}

                                        <button type="submit" className="btn btn-danger table_button" onClick={() => {
                                            deletionAlert(row.original.id)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                            </svg> Usuń
                                        </button>

                                        <a href={'/room/' + row.original.id}>
                                            <button type="submit" className="btn btn-success table_button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-plus-circle"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg> Edytuj
                                            </button>
                                        </a>
                                        <a href={'/add_room_break/' + row.original.id}>
                                            <button type="submit" className="btn btn-warning table_button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pause-circle"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path
                                                        d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                                                </svg> Dodaj Przerwę
                                            </button>
                                        </a>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Rooms;