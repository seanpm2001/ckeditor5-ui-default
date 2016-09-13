/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document, window */

import Template from '../../template.js';
import ToolbarView from '../toolbarview.js';

/**
 * The sticky toolbar view class.
 *
 * See {@link ui.stickyToolbar.StickyToolbar}, {@link ui.toolbar.ToolbarView}.
 *
 * @memberOf ui.stickyToolbar
 * @extends ui.toolbar.ToolbarView
 */
export default class StickyToolbarView extends ToolbarView {
	/**
	 * @inheritDoc
	 */
	constructor( locale, limiterElement ) {
		super( locale );

		const bind = this.bind;

		this.model.set( 'isSticky', false );
		this.model.set( 'isStickyToLimiterBottom', false );
		this.model.set( 'left', null );
		this.model.set( 'marginLeft', null );

		/**
		 * The limiter element for the sticky toolbar instance. Its bounding rect limits
		 * the "stickyness" of the toolbar, i.e. when the toolbar reaches the bottom
		 * edge of the limiter, it becomes sticky to that edge and does not float
		 * off the limiter.
		 *
		 * @member {HTMLElement} ui.stickyToolbar.StickyToolbarView#limiterElement
		 */
		this.limiterElement = limiterElement;

		/**
		 * The DOM bounding client rect of the {@link ui.View#element} of the toolbar.
		 *
		 * @protected
		 * @member {Object} ui.stickyToobar.StickyToolbarView#_toolbarRect
		 */
		this._toolbarRect = null;

		/**
		 * The DOM bounding client rect of the {@link ui.stickyToolbar.StickyToolbarView#limiterElement}
		 * of the toolbar.
		 *
		 * @protected
		 * @member {Object} ui.stickyToobar.StickyToolbarView#_limiterRect
		 */
		this._limiterRect = null;

		Template.extend( this.template, {
			attributes: {
				class: [
					// Toggle class of the toolbar when "sticky" state changes in the model.
					bind.if( 'isSticky', 'ck-toolbar_sticky' ),
					bind.if( 'isStickyToLimiterBottom', 'ck-toolbar_sticky_bottom-limit' ),
				],
				style: {
					width: bind.to( 'isSticky', ( isSticky ) => {
						return isSticky ? pixelize( this._limiterRect.width ) : null;
					} ),

					top: bind.to( 'isStickyToLimiterBottom', ( isStickyToLimiterBottom ) => {
						return isStickyToLimiterBottom ?
							pixelize( window.scrollY + this._limiterRect.bottom - this._toolbarRect.height ) : null;
					} ),

					left: bind.to( 'left' ),
					marginLeft: bind.to( 'marginLeft' )
				}
			}
		} );

		/**
		 * A dummy element which visually fills the space as long as the
		 * actual toolbar is sticky. It prevents flickering of the UI.
		 *
		 * @private
		 * @property {HTMLElement} ui.stickyToobar.StickyToolbarView#_elementPlaceholder
		 */
		this._elementPlaceholder = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-toolbar__placeholder'
				],
				style: {
					display: bind.to( 'isSticky', ( isSticky ) => {
						return isSticky ? 'block' : 'none';
					} ),
					height: bind.to( 'isSticky', ( isSticky ) => {
						return isSticky ? pixelize( this._toolbarRect.height ) : null;
					} )
				}
			}
		} ).render();

		/**
		 * Model of this sticky toolbar view.
		 *
		 * @member {ui.stickyToobar.StickyToolbarViewModel} ui.stickyToolbar.StickyToolbarView#model
		 */
	}

	init() {
		super.init();

		this.element.parentNode.insertBefore( this._elementPlaceholder, this.element );

		// Update sticky state of the toolbar as the window is being scrolled.
		this.listenTo( window, 'scroll', () => {
			this._checkIfShouldBeSticky();
		} );

		// Synchronize with `model.isActive` because sticking an inactive toolbar is pointless.
		this.listenTo( this.model, 'change:isActive', () => {
			this._checkIfShouldBeSticky();
		} );
	}

	/**
	 * Destroys the toolbar and removes the {@link _elementPlaceholder}.
	 */
	destroy() {
		super.destroy();

		this._elementPlaceholder.remove();
	}

	/**
	 * Analyzes the environment to decide whether the toolbar should
	 * be sticky or not. Then, it uses {@link _stick} and {@link _detach}
	 * methods to manage the state of the toolbar.
	 *
	 * @protected
	 */
	_checkIfShouldBeSticky() {
		const limiterRect = this._limiterRect = this.limiterElement.getBoundingClientRect();

		this.model.isSticky = limiterRect.top < 0 && this.model.isActive;

		// Stick the toolbar to the top edge of the viewport simulating CSS position:sticky.
		// TODO: Possibly replaced by CSS in the future http://caniuse.com/#feat=css-sticky
		if ( this.model.isSticky ) {
			const toolbarRect = this._toolbarRect = this.element.getBoundingClientRect();

			this.model.isStickyToLimiterBottom = limiterRect.bottom < toolbarRect.height;

			if ( this.model.isStickyToLimiterBottom ) {
				this.model.left = pixelize( limiterRect.left - document.body.getBoundingClientRect().left );
				this.model.marginLeft = null;
			} else {
				this.model.left = null;
				this.model.marginLeft = pixelize( -window.scrollX - 1 );
			}
		}
		// Detach the toolbar from the top edge of the viewport.
		else {
			this.model.isStickyToLimiterBottom = false;
			this.model.marginLeft = this.model.left = null;
		}
	}
}

/**
 * Add `px` unit to the passed value.
 *
 * @param {String|Number} value
 * @returns {String} Value with `px` unit,
 */
function pixelize( value ) {
	return `${ value }px`;
}

/**
 * The sticky toolbar view {@link ui.Model} interface.
 *
 * @interface ui.stickyToobar.StickyToolbarViewModel
 */

/**
 * Controls whether the sticky toolbar should be active. When any editable
 * is focused in the editor, toolbar becomes active.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#isActive
 */

/**
 * Controls whether the sticky toolbar is in the "sticky" state.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#isSticky
 */

/**
 * Controls whether the sticky toolbar reached the bottom edge of the
 * {@link ui.stickyToolbar.StickyToolbarView#limiterElement}.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#isStickyToLimiterBottom
 */

/**
 * Controls the `left` CSS style of the toolbar.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#left
 */

/**
 * Controls the `margin-left` CSS style of the toolbar.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#marginLeft
 */
