import React from "react";
import Sortable from 'sortablejs';
import {IComponent, ISortableComponents} from "../../../../includes/Interfaces";
import ComponentBar from "./ComponentBar";
import {
    allComponents,
    allComponentsEdit
} from "../../../../includes/AllComponents";

class SortableComponents extends React.Component<ISortableComponents, any> {
    sortableContainersDecorator = (componentBackingInstance:any) => {
        if (componentBackingInstance) {
            let options = {
                handle: ".group-title",
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    sortableGroupDecorator = (componentBackingInstance:any) => {
        if (componentBackingInstance) {
            var props = this.props;
            let options = {
                draggable: ".item",
                group: "shared",
                sort: true,
                onAdd: function (evt) {
                    var id = evt.item.attributes[1].nodeValue;
                    var index = evt.newIndex;
                    evt.item.parentNode.removeChild(evt.item);
                    props.addComponent(id, index);

                },
                onEnd: function (evt) {
                    props.itemsSorting(evt.oldIndex, evt.newIndex);
                },
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    renderEditBar() {
        let active_editor = this.props.active_editor;
        if (active_editor > -1) {
            let editbar = this.props.components[active_editor];
            if (editbar.component) {
                var key = editbar.component + 'Edit';
                editbar.props.componentUpdate = this.props.componentUpdate;
                return (
                    <div className="col-md-4 tpl-column-right">
                        { React.createElement(allComponentsEdit[key], editbar.props) }
                        <div className="edit-close"
                             onClick={ this.props.handleClose }>Save & Close
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <ComponentBar
                    sortableGroupDecorator={this.sortableGroupDecorator.bind(this)}/>
            );
        }
    }

    deleteComponent(index:number) {
        this.props.handleDelete(index);
    }

    editComponent(index:number) {
        this.props.componentEditHandler(index);
    }

    render() {        
        const SortableItem = (({value}) => {
                return <div className="item">
                    <div className="tpl-block-controls">
                        <i className="fa fa-pencil" aria-hidden="true"
                           onClick={this.editComponent.bind(this, value.index)}/>
                        <i className="fa fa-trash" aria-hidden="true"
                           onClick={this.deleteComponent.bind(this, value.index)}/>
                    </div>
                    { React.createElement(value.key, value.props) }
                </div>
            }
        );
        var itemsList;
        if (this.props.components.length > 0) {
            itemsList = <div className="group-list"
                             ref={this.sortableGroupDecorator.bind(this)}>
                {this.props.components.map((item:IComponent, index:number) => {
                    var key = item.component;
                    item.props.preview = false;
                    item.props.id = index;
                    return <SortableItem key={`item-${index}`}
                                         value={ { key:allComponents[key], props:item.props, index:index } }/>
                })}
            </div>;
        } else {
            itemsList = <div className="group-list empty"
                             ref={this.sortableGroupDecorator.bind(this)}>
                To build your template Drag and Drop blocks into this area
            </div>;
        }
        return (
            <div className="container"
                 ref={this.sortableContainersDecorator.bind(this)}>
                <div className="col-md-8 tpl-column-left"
                     ref="tpl_container">
                    { itemsList }
                </div>
                { this.renderEditBar() }
            </div>
        );
    }
}

export default SortableComponents;