import { useState, useEffect } from 'react'
import '../styles/List.css'
import whiteflag from '../assets/white_flag.png'
const List = ({data, isLoading}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const areaValues = data.map((item) => item.area?.kilometers)
    const minArea = areaValues.length ? Math.min(...areaValues) : 0
    const maxArea = areaValues.length ? Math.max(...areaValues) : 0
    const [area, setArea] = useState(maxArea)

    const searchItemsDisplay = data
        ? data.filter((item) =>
            searchTerm.trim().length === 0 ||
            item.names?.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.codes.alpha_2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.capitals[0]?.name.toLowerCase().includes(searchTerm.toLowerCase())
            
          ).filter((item) => item.area?.kilometers <= area)
        : []
    const currentPageItems = searchItemsDisplay.slice(startIndex, endIndex)
    const totalPages = Math.ceil(searchItemsDisplay.length / itemsPerPage)

    return (
        <div className="List">
            <div className="filters">
                <div className="search-filter">
                <input type="text" placeholder="Search by name, region, code, or capital" value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
                }} />
                </div>
                <div className="area-filter">
                    <label>Area: ≤ {area.toLocaleString()} km²</label>
                    <input type="range" min={minArea} max={maxArea} value={area} step="any" onChange={(e) => {
                    setArea(Number(e.target.value));
                    setCurrentPage(1);
                    }} />
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Name</th>
                            <th>Capital</th>
                            <th>Area</th>
                            <th>Population</th>
                            <th>Region</th>
                            <th>Coordinates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: itemsPerPage }).map((_, i) => (
                            <tr key={i}>
                            <td className="Loading" colSpan="7">Loading...</td>
                            </tr>
                        ))
                        ) : (
                        currentPageItems.map((item) => (
                            <tr key={item.uuid}>
                                <td><img src={item.flag.url_png ? item.flag.url_png : whiteflag} alt={item.name} /></td>
                                <td>{item.names.common}</td>
                                <td>{item.capitals[0]?.name || 'N/A'}</td>
                                <td>{item.area.kilometers.toLocaleString()}</td>
                                <td>{item.population.toLocaleString()}</td>
                                <td>{item.region}</td>
                                <td>{item.coordinates ? `(${item.coordinates.lat.toFixed(1)}, ${item.coordinates.lng.toFixed(1)})` : 'N/A'}</td>
                            </tr>
                        )) )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        ← Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>
                        Next →
                    </button>
            </div>
        </div>
    )
}

export default List;
