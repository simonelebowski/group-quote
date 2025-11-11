import {useState, useMemo} from 'react'
import Card from "./Card";
import { Activity, ActivityCategory } from '@/types/types';

export default function ActivitiesCard() {
    return (
        <Card>
            <h2 className="mb-3 text-lg font-semibold">
              4) Activities & Trips
            </h2>

            <div className="space-y-3">
              {loc.activities.map((a) => {
                const sel = selectedActivities[a.id] || {
                  enabled: false,
                  mode: "group",
                  count: 0,
                };

                return (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
                  >
                    {/* Left: details + include checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5"
                        checked={sel.enabled}
                        onChange={(e) =>
                          setSelectedActivities((prev) => ({
                            ...prev,
                            [a.id]: {
                              ...(prev[a.id] || { mode: "group", count: 0 }),
                              enabled: e.target.checked,
                            },
                          }))
                        }
                      />
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-neutral-600">
                          {unitLabel(a.unit)} · {fmt(a.price, loc.currency)}
                        </div>
                        {a.description && (
                          <div className="text-xs text-neutral-600">
                            {a.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: group/quantity selector (only active if ticked) */}
                    <div className="flex items-center gap-2">
                      <select
                        className="input w-40"
                        disabled={!sel.enabled}
                        value={sel.mode}
                        onChange={(e) =>
                          setSelectedActivities((prev) => ({
                            ...prev,
                            [a.id]: {
                              ...(prev[a.id] || { enabled: true, count: 0 }),
                              mode: e.target.value as "group" | "quantity",
                            },
                          }))
                        }
                      >
                        <option value="group">Whole group</option>
                        <option value="quantity">Specific quantity</option>
                      </select>

                      {sel.enabled && sel.mode === "quantity" && (
                        <input
                          type="number"
                          min={0}
                          placeholder="# people"
                          className="input w-28"
                          value={sel.count}
                          onChange={(e) =>
                            setSelectedActivities((prev) => ({
                              ...prev,
                              [a.id]: {
                                ...(prev[a.id] || {
                                  enabled: true,
                                  mode: "quantity",
                                }),
                                count: Math.max(0, Number(e.target.value) || 0),
                              },
                            }))
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
        </Card>
    )
}