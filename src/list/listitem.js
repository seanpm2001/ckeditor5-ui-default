/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The list item controller class.
 *
 * @memberOf ui.list
 * @extends ui.Controller
 */
export default class ListItem extends Controller {
	/**
	 * Creates an instance of {@link ui.list.ListItem} class.
	 *
	 * @param {ui.list.ListItemModel} model Model of this list item.
	 * @param {ui.View} view View of this list item.
	 */
	constructor( model, view ) {
		super( model, view );

		view.bind( 'label' ).to( model );

		if ( model.style ) {
			view.bind( 'style' ).to( model );
		}

		view.on( 'click', () => model.fire( 'execute' ) );
	}
}

/**
 * The list item component {@link ui.Model} interface.
 *
 * @interface ui.list.ListItemModel
 */

/**
 * The label of the list item.
 *
 * @observable
 * @member {String} ui.list.ListItemModel#label
 */

/**
 * (Optional) The DOM style attribute of the list item.
 *
 * @observable
 * @member {String} ui.list.ListItemModel#style
 */

/**
 * Fired when the list item should be executed, usually when
 * the view has been clicked.
 *
 * @event ui.list.ListItemModel#execute
 */
