/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';

/**
 * The Icon controller class.
 *
 *		const model = new Model( {
 *			name: 'bold',
 *			align: 'LEFT'
 *		} );
 *
 *		// An instance of "bold" Icon, aligned to the left.
 *		new Icon( model, new IconView() );
 *
 * See {@link ui.icon.IconView}, {@link ui.iconManager.IconManager}.
 *
 * @memberOf ui.icon
 * @extends ui.Controller
 */
export default class Icon extends Controller {
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'name', 'align' ).to( model );
	}
}

/**
 * The Icon component {@link ui.Model} interface.
 *
 * @memberOf ui.icon
 * @interface ui.icon.IconModel
 */

/**
 * The name of the icon. It corresponds with the name of the
 * file in the {@link ui.iconManager.IconManager}.
 *
 * @member {String} ui.icon.IconModel#name
 */

/**
 * The alignment of the icon.
 *
 * @member {'LEFT'|'RIGHT'} ui.icon.IconModel#align
 */
