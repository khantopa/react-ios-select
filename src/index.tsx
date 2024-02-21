import React, {
  useEffect,
  useRef,
  useState,
  WheelEvent,
  TouchEvent,
  CSSProperties,
  useCallback,
} from 'react';

import { ISelect, ISelectItemValue } from './Select.interface';
import SelectItem, { itemHeight } from './SelectItem';
import './styles.css';

const usePrevious = (value) => {
  const prevValueRef = useRef();
  useEffect(() => {
    prevValueRef.current = value;
  });
  return prevValueRef.current;
};

const Picker = <T extends unknown>({
  options,
  value,
  onChange,
  autoFocus,
  height = 250,
}: ISelect<T>): JSX.Element => {
  const [isMoving, setIsMoving] = useState(false);
  const [startTouchY, setStartTouchY] = useState(0);
  const [startScrollerTranslate, setStartScrollerTranslate] = useState(0);
  const [scrollerTranslate, setScrollerTranslate] = useState(0);
  const [minTranslate, setMinTranslate] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const previousValueId = usePrevious(value.id);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemContainerRef = useRef<HTMLDivElement>(null);

  const handleOnValueChange = useCallback(
    (value: ISelectItemValue<T>) => onChange(value),
    [onChange]
  );

  const computeTranslate = useCallback(
    (value: ISelectItemValue<T>) => {
      let selectedIndex = options.findIndex((option) => option.id === value.id);
      if (selectedIndex === -1) {
        handleOnValueChange(options[0]);
        selectedIndex = 0;
        setFocusedIndex(0);
      }

      const scrollerTranslate =
        height / 2 - itemHeight / 2 - selectedIndex * itemHeight;
      const minTranslate =
        height / 2 - itemHeight * options.length + itemHeight / 2;
      const maxTranslate = height / 2 - itemHeight / 2;

      setScrollerTranslate(scrollerTranslate);
      setMinTranslate(minTranslate);
      setMaxTranslate(maxTranslate);
    },
    [handleOnValueChange, height, options]
  );

  const handleItemClick = (option: ISelectItemValue<T>) => {
    handleOnValueChange(option);
  };

  const handleUpdateOnScrollSettled = useCallback(
    (index: number, delay = 500) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(() => {
        handleOnValueChange(options[index]);
      }, delay);
    },
    [handleOnValueChange, options]
  );

  useEffect(() => {
    if (!itemContainerRef.current) return;
    const interval = setTimeout(() => {
      if (itemContainerRef.current) {
        itemContainerRef.current.style.transitionDuration = '0.3s';
      }
    }, 1000);

    return () => {
      return clearTimeout(interval);
    };
  }, []);

  useEffect(() => {
    if (autoFocus && itemContainerRef.current) {
      itemContainerRef.current.focus();
    }
  }, [autoFocus]);

  const onScrollerTranslateSettled = useCallback(
    (scrollerTranslateWithDelta: number, delay?: number) => {
      let activeIndex: number;

      if (scrollerTranslateWithDelta >= maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslateWithDelta <= minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = -Math.round(
          (scrollerTranslateWithDelta - maxTranslate) / itemHeight
        );
      }

      setFocusedIndex(activeIndex);

      handleUpdateOnScrollSettled(activeIndex, delay);
    },
    [maxTranslate, minTranslate, options.length, handleUpdateOnScrollSettled]
  );

  const handleScroll = (
    event: WheelEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    let deltaY = 0;

    if ('key' in event && (event.keyCode === 38 || event.keyCode === 40)) {
      deltaY = event.keyCode === 38 ? 48 : -48;
    } else if ('deltaY' in event) {
      deltaY = -event.deltaY;
    }

    const updatedScrollerTranslate = scrollerTranslate + Math.round(deltaY);
    const nextScrollerTranslate = Math.max(
      Math.min(updatedScrollerTranslate, maxTranslate),
      minTranslate
    );
    setScrollerTranslate(nextScrollerTranslate);
    onScrollerTranslateSettled(nextScrollerTranslate);
  };

  const handleTouchStart = (event: TouchEvent) => {
    const startTouchY = event.targetTouches[0].pageY;
    setStartTouchY(startTouchY);
    setStartScrollerTranslate(scrollerTranslate);
  };

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touchY = event.targetTouches[0].pageY;

      if (!isMoving) {
        setIsMoving(true);
        return;
      }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;

      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate =
          minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate =
          maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
      }

      setScrollerTranslate(nextScrollerTranslate);
      onScrollerTranslateSettled(nextScrollerTranslate);
    },
    [
      isMoving,
      startScrollerTranslate,
      startTouchY,
      minTranslate,
      maxTranslate,
      onScrollerTranslateSettled,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMoving) {
      return;
    }

    setIsMoving(false);
    setStartTouchY(0);
    setStartScrollerTranslate(0);

    onScrollerTranslateSettled(scrollerTranslate, 0);
  }, [isMoving, onScrollerTranslateSettled, scrollerTranslate]);

  const handleTouchCancel = useCallback(() => {
    if (!isMoving) {
      return;
    }

    setIsMoving(false);
    setStartTouchY(0);
    setStartScrollerTranslate(0);
    setScrollerTranslate(startScrollerTranslate);
  }, [isMoving, startScrollerTranslate]);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearInterval(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMoving || value.id === previousValueId) {
      return;
    }

    computeTranslate(value);
  }, [computeTranslate, isMoving, value, previousValueId]);

  useEffect(() => {
    setFocusedIndex(options.findIndex((option) => option.id === value.id));
  }, [options, value.id]);

  const translateString = `translate3d(0, ${scrollerTranslate}px, 0)`;

  const style: CSSProperties = {
    msTransform: translateString,
    MozTransform: translateString,
    OTransform: translateString,
    WebkitTransform: translateString,
    transform: translateString,
  };

  if (isMoving) {
    style.transitionDuration = '0s';
  }

  return (
    <div className="IOS_Select_Container">
      <div style={{ position: 'relative', width: '100%', height }}>
        <div
          aria-label="picker"
          aria-roledescription="listbox"
          role="listbox"
          className="IOS_Select_Item_Container"
          style={style}
          tabIndex={-1}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          onWheel={handleScroll}
          onKeyDown={handleScroll}
          ref={itemContainerRef}
        >
          {options.map((option: ISelectItemValue<T>, index: number) => {
            const offset = Math.abs(index - focusedIndex);
            const style = {
              opacity: Math.max(1 - offset * 0.4, 0.2),
              fontSize: Math.max(20 - offset * 2, 6),
            };

            return (
              <SelectItem
                {...option}
                key={option.id}
                isSelected={value.id === option.id}
                onClick={() => handleItemClick(option)}
                style={style}
              />
            );
          })}
        </div>
        <div className="IOS_Select_Highlight" />
      </div>
    </div>
  );
};

export default Picker;
