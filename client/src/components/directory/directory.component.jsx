import React from "react";
import { connect } from 'react-redux'

import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

import {selectDirectorySections } from '../../redux/directory/directory.selectors'
import {createStructuredSelector } from 'reselect'

/** NO need for class component since we dont need to use
 * "this.state" we already moved it to the "directoryReducer"
 */
// class Directory extends React.Component {
const Directory = ({sections}) => {
    return (
      <div className="directory-menu">
        {
          /* this.state.sections.map(({title, imageUrl, id, size, linkUrl}) => (
                        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/> */
          /*this.state.sections.map(({ id, ...otherSectionProps }) => ( */
          sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
          ))
        }
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
