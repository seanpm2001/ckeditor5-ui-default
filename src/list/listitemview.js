/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The list item view class.
 *
 * See {@link ui.list.ListItem}.
 *
 * @memberOf ui.list
 * @extends ui.View
 */
export default class ListItemView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'li',

			attributes: {
				class: [
					'ck-list__item'
				],
				style: bind.to( 'style' )
			},

			children: [
				{
					text: bind.to( 'label' )
				}
			],

			on: {
				click: bind.to( 'execute' )
			}
		} );

		/**
		 * The label of the list item.
		 *
		 * @observable
		 * @member {String} ui.list.ListItemView#label
		 */

		/**
		 * (Optional) The DOM style attribute of the list item.
		 *
		 * @observable
		 * @member {String} ui.list.ListItemView#style
		 */

		/**
		 * Fired when the list item has been clicked.
		 *
		 * @event ui.list.ListItemView#execute
		 */
	}
}
