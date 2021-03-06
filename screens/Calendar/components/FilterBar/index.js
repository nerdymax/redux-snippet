import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import _ from 'lodash'

import 'react-select/less/default.less'

class FilterBar extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    fetchingSites: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
  }

  handleFilterChange = (field, option) => {
    const newValue = option ? option.value : ''

    this.props.updateFilter (field, newValue)
  }

  render () {
    const {
      sites,
      fetchingSites,
      filter,
    } = this.props

    const siteLocationOptions = sites.map(s => {
      return {
        label: s.name,
        value: s.name,
      }
    })
    const selectedSite = sites.filter(s => s.name === filter.siteLocation)[0]
    const protocolOptions = !selectedSite ? [] : selectedSite.studies.map(study => {
      return {
        label: study.protocolNumber,
        value: study.protocolNumber
      }
    })
    const indications = !selectedSite ? [] : selectedSite.studies.map(study => {
      return {
        label: study.indication,
        value: study.indication
      }
    })

    const indicationOptions = _.uniqBy(indications, 'value')

    return (
      <div className="filter-bar row">
        <div className="col-sm-3">
          <input className="search-box" type="text" placeholder="Search" onChange={(ev) => this.handleFilterChange('patientName', ev.target)} />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.siteLocation}
            disabled={fetchingSites}
            options={siteLocationOptions}
            placeholder="--Select Site Location--"
            onChange={(option) => this.handleFilterChange('siteLocation', option)}
          />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.indication}
            options={indicationOptions}
            placeholder="--Select Indication--"
            onChange={(option) => this.handleFilterChange('indication', option)}
          />
        </div>
        <div className="col-sm-3">
          <Select
            value={filter.protocol}
            options={protocolOptions}
            placeholder="--Select Protocol--"
            onChange={(option) => this.handleFilterChange('protocol', option)}
          />
        </div>
      </div>
    )
  }
}

export default FilterBar
