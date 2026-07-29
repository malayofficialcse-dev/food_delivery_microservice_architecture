import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Flame, Minus, Plus, ShieldCheck, Star, Tag, ChefHat } from 'lucide-react';
import { currency, restaurants } from '../data/appData';
import type { Page, Product } from '../types';

type ProductDetailPageProps = {
  productId: string;
  quantity: number;
  onAddToCart: (productId: string, customizationText?: string, priceAddition?: number, qtyToAdd?: number) => void;
  onDecrease: (productId: string, customizationText?: string) => void;
  onNavigate: (page: Page) => void;
  products: Product[];
};

function getCustomizationOptions(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('pizza') || cat.includes('pasta')) {
    return {
      sizes: [
        { name: 'Regular size', price: 0 },
        { name: 'Medium size', price: 2.5 },
        { name: 'Large size', price: 4.5 },
      ],
      addons: [
        { name: 'Extra Cheese', price: 1.50 },
        { name: 'Extra Veggies', price: 1.00 },
        { name: 'Black Olives', price: 0.80 },
        { name: 'Garlic Butter Dip', price: 0.80 },
      ],
    };
  } else if (cat.includes('bowl') || cat.includes('curry') || cat.includes('noodles')) {
    return {
      sizes: [
        { name: 'Single Portion', price: 0 },
        { name: 'Sharing Pack', price: 4.90 },
      ],
      addons: [
        { name: 'Extra Paneer/Chicken', price: 3.00 },
        { name: 'Boiled Egg', price: 1.00 },
        { name: 'Extra Jasmine Rice', price: 1.50 },
        { name: 'Garlic Naan', price: 2.00 },
      ],
    };
  } else {
    return {
      sizes: [
        { name: 'Regular Size', price: 0 },
        { name: 'Double-up Pack', price: 3.00 },
      ],
      addons: [
        { name: 'Extra Cheese Slice', price: 0.80 },
        { name: 'Crispy Onion Rings', price: 1.20 },
        { name: 'Sliced Jalapenos', price: 0.50 },
        { name: 'Spicy Azure Dip', price: 0.80 },
      ],
    };
  }
}

export function ProductDetailPage({
  productId,
  onAddToCart,
  onNavigate,
  products,
}: ProductDetailPageProps) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const restaurant = restaurants.find((r) => r.id === product.restaurantId) ?? restaurants[0];
  const suggestions = products.filter((p) => p.restaurantId === restaurant.id && p.id !== product.id);

  const options = getCustomizationOptions(product.category);

  // States for customization
  const [selectedSize, setSelectedSize] = useState(options.sizes[0]);
  const [selectedAddons, setSelectedAddons] = useState<typeof options.addons>([]);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [instructions, setInstructions] = useState('');
  const [localQty, setLocalQty] = useState(1);

  const toggleAddon = (addon: typeof options.addons[0]) => {
    setSelectedAddons((current) =>
      current.some((item) => item.name === addon.name)
        ? current.filter((item) => item.name !== addon.name)
        : [...current, addon]
    );
  };

  const sizePrice = selectedSize.price;
  const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const singleItemPrice = product.price + sizePrice + addonsPrice;
  const totalPrice = singleItemPrice * localQty;

  const handleAddToCart = () => {
    const customParts = [
      selectedSize.name,
      ...selectedAddons.map((a) => a.name),
      `Spice: ${spiceLevel}`,
    ];
    if (instructions.trim()) {
      customParts.push(`Note: ${instructions.trim()}`);
    }
    const customizationSummary = customParts.join(', ');
    const priceAddition = sizePrice + addonsPrice;

    onAddToCart(product.id, customizationSummary, priceAddition, localQty);
    setLocalQty(1);
  };

  // Mock nutrient distribution for visual display
  const carbs = Math.round(product.calories * 0.11);
  const protein = Math.round(product.calories * 0.035);
  const fat = Math.round(product.calories * 0.022);

  return (
    <div className="pdp-root">
      {/* Back link */}
      <div className="pdp-top-nav">
        <button
          className="pdp-back-btn"
          type="button"
          onClick={() => onNavigate({ name: 'restaurant', restaurantId: restaurant.id })}
        >
          <ArrowLeft size={16} /> Back to {restaurant.name}
        </button>
      </div>

      {/* Main product card */}
      <section className="pdp-hero">
        <div className="pdp-img-section">
          <div className="pdp-img-wrap">
            <img src={product.image} alt={product.name} className="pdp-img" />
            {product.bestseller && (
              <span className="pdp-bestseller-label">
                <Flame size={13} fill="currentColor" /> Bestseller
              </span>
            )}
          </div>

          {/* Nutrition info cards */}
          <div className="pdp-nutrition-panel">
            <span className="pdp-nutrition-head">Nutritional Info</span>
            <div className="pdp-nutrition-grid">
              <div className="pdp-nutrient">
                <span className="pdp-nutrient-val">{product.calories}</span>
                <span className="pdp-nutrient-lbl">kcal</span>
              </div>
              <div className="pdp-nutrient">
                <span className="pdp-nutrient-val">{carbs}g</span>
                <span className="pdp-nutrient-lbl">Carbs</span>
              </div>
              <div className="pdp-nutrient">
                <span className="pdp-nutrient-val">{protein}g</span>
                <span className="pdp-nutrient-lbl">Protein</span>
              </div>
              <div className="pdp-nutrient">
                <span className="pdp-nutrient-val">{fat}g</span>
                <span className="pdp-nutrient-lbl">Fat</span>
              </div>
            </div>
          </div>

          <div className="pdp-chef-badge">
            <ChefHat size={16} />
            <span>Chef's Choice: Recommended with fresh sides</span>
          </div>
        </div>

        <div className="pdp-info-section">
          {/* Header Info */}
          <div className="pdp-header-details">
            <div className="pdp-row-category">
              <span className={`pdp-veg-dot-badge ${product.vegetarian ? 'veg' : 'non-veg'}`}>
                <span className="dot" />
              </span>
              <span className="pdp-meta-category">{product.category}</span>
            </div>
            
            <h1 className="pdp-title">{product.name}</h1>
            
            <button
              className="pdp-restaurant-link"
              type="button"
              onClick={() => onNavigate({ name: 'restaurant', restaurantId: restaurant.id })}
            >
              Prepared by {restaurant.name}
            </button>
            
            <p className="pdp-desc">{product.description}</p>

            <div className="pdp-rating-row">
              <div className="pdp-rating-stars">
                <Star size={14} fill="currentColor" className="star-active" />
                <strong>{product.rating}</strong>
                <span>(50+ ratings)</span>
              </div>
              <div className="pdp-price-tag">
                {currency.format(product.price)}
              </div>
            </div>
          </div>

          {/* Customization options */}
          <div className="pdp-customizer">
            {/* Options group 1: Sizes */}
            <div className="pdp-option-group">
              <div className="pdp-group-head">
                <h3>Select Size</h3>
                <span className="pdp-badge-required">Required</span>
              </div>
              <div className="pdp-size-selector">
                {options.sizes.map((sz) => {
                  const isSelected = selectedSize.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      type="button"
                      className={`pdp-size-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      <span className="pdp-sz-name">{sz.name}</span>
                      <span className="pdp-sz-price">
                        {sz.price === 0 ? 'Base price' : `+${currency.format(sz.price)}`}
                      </span>
                      {isSelected && <span className="pdp-sz-check"><Check size={14} /></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options group 2: Addons */}
            <div className="pdp-option-group">
              <div className="pdp-group-head">
                <h3>Choose Add-ons</h3>
                <span className="pdp-badge-optional">Optional</span>
              </div>
              <div className="pdp-addons-list">
                {options.addons.map((addon) => {
                  const isSelected = selectedAddons.some((item) => item.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      className={`pdp-addon-row ${isSelected ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon)}
                    >
                      <div className="pdp-addon-left">
                        <span className={`pdp-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <Check size={12} />}
                        </span>
                        <span className="pdp-addon-name">{addon.name}</span>
                      </div>
                      <span className="pdp-addon-price">+{currency.format(addon.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options group 3: Spice level */}
            <div className="pdp-option-group">
              <div className="pdp-group-head">
                <h3>Spice Preference</h3>
                <span className="pdp-badge-optional">Optional</span>
              </div>
              <div className="pdp-spice-selector">
                {['Mild', 'Medium', 'Hot'].map((lvl) => {
                  const isSelected = spiceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      className={`pdp-spice-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSpiceLevel(lvl)}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options group 4: Special Instructions */}
            <div className="pdp-option-group">
              <div className="pdp-group-head">
                <h3>Cooking Instructions</h3>
                <span className="pdp-badge-optional">Optional</span>
              </div>
              <textarea
                className="pdp-instructions-input"
                placeholder="E.g., No onion/garlic, extra spicy, contact-free delivery instructions..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Sticky Checkout Bar */}
          <div className="pdp-action-bar">
            <div className="pdp-qty-control">
              <button
                className="pdp-qty-btn"
                type="button"
                onClick={() => setLocalQty(Math.max(1, localQty - 1))}
              >
                <Minus size={16} />
              </button>
              <strong className="pdp-qty-display">{localQty}</strong>
              <button
                className="pdp-qty-btn"
                type="button"
                onClick={() => setLocalQty(localQty + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              className="pdp-submit-btn"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Basket — {currency.format(totalPrice)}
            </button>
          </div>

          <div className="pdp-trust-indicator">
            <ShieldCheck size={16} />
            <span>Prepared in highly sanitized kitchens · Real-time order tracking</span>
          </div>
        </div>
      </section>

      {/* Suggested Pairings */}
      {suggestions.length > 0 && (
        <section className="pdp-suggestions">
          <div className="pdp-sug-head">
            <span className="pdp-sug-tag">🍽️ Frequently ordered together</span>
            <h2 className="pdp-sug-title">Complete your meal</h2>
          </div>
          <div className="pdp-sug-grid">
            {suggestions.map((item) => (
              <article className="pdp-sug-card" key={item.id}>
                <button
                  className="pdp-sug-img-btn"
                  type="button"
                  onClick={() => onNavigate({ name: 'product', productId: item.id })}
                >
                  <img src={item.image} alt={item.name} />
                  {item.vegetarian && (
                    <span className="pdp-sug-veg-dot veg">
                      <span className="dot" />
                    </span>
                  )}
                </button>
                <div className="pdp-sug-body">
                  <strong className="pdp-sug-name">{item.name}</strong>
                  <span className="pdp-sug-cat">{item.category}</span>
                  <div className="pdp-sug-footer">
                    <span className="pdp-sug-price">{currency.format(item.price)}</span>
                    <button
                      className="pdp-sug-add-btn"
                      type="button"
                      onClick={() => onAddToCart(item.id)}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
